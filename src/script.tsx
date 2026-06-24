import { render, Text, Box, useInput, createSignal, createEffect, onCleanup } from 'solid-ink';

// Oyun Ayarları
const WIDTH = 30; // Emojiler 2 karakter kapladığı için genişliği biraz daralttık
const HEIGHT = 15;
const GAP_SIZE = 4;

const FlappyBird = () => {
    const [birdY, setBirdY] = createSignal(5);
    const [pipeX, setPipeX] = createSignal(WIDTH);
    const [pipeGapY, setPipeGapY] = createSignal(5);
    const [score, setScore] = createSignal(0);
    const [gameOver, setGameOver] = createSignal(false);

    // Klavye Kontrolleri
    useInput((input, key) => {
        if (key.escape) process.exit();

        if (gameOver()) {
            if (input === 'r' || input === 'R') {
                setBirdY(5);
                setPipeX(WIDTH);
                setPipeGapY(Math.floor(Math.random() * (HEIGHT - GAP_SIZE - 2)) + 1);
                setScore(0);
                setGameOver(false);
            }
            return;
        }

        if (key.return || input === ' ') {
            setBirdY(y => Math.max(0, y - 2));
        }
    });

    // Fizik ve Oyun Döngüsü
    createEffect(() => {
        if (gameOver()) return;

        const gameLoop = setInterval(() => {
            // Yerçekimi
            setBirdY(y => {
                const nextY = y + 0.8; // Daha akıcı bir düşüş için float kullandık
                if (nextY >= HEIGHT) {
                    setGameOver(true);
                    return HEIGHT - 1;
                }
                return nextY;
            });

            // Engeli Kaydır
            setPipeX(x => {
                if (x <= 0) {
                    setScore(s => s + 1);
                    setPipeGapY(Math.floor(Math.random() * (HEIGHT - GAP_SIZE - 2)) + 1);
                    return WIDTH;
                }
                return x - 1;
            });

            // Çarpışma Testi
            const birdX = 5;
            const currentBirdY = Math.floor(birdY());
            const currentPipeX = pipeX();
            const currentGapY = pipeGapY();

            if (currentPipeX === birdX) {
                if (currentBirdY < currentGapY || currentBirdY >= currentGapY + GAP_SIZE) {
                    setGameOver(true);
                }
            }
        }, 100); // 100ms: Daha akıcı ve hızlı tepki süresi

        onCleanup(() => clearInterval(gameLoop));
    });

    // PERFORMANS OPTİMİZASYONU VE KAYMA DÜZELTMESİ
    // Her karede alt bileşenler oluşturmak yerine, tüm haritayı tek bir metin bloğu olarak basıyoruz.
    const renderGameFrame = () => {
        let frame = '';
        const bY = Math.floor(birdY());
        const pX = pipeX();
        const gY = pipeGapY();

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                if (x === 5 && y === bY) {
                    frame += '🐦'; // 2 karakter genişliğinde
                    continue;
                }
                if (x === pX) {
                    if (y < gY || y >= gY + GAP_SIZE) {
                        frame += '██'; // Kaymayı önlemek için boruyu da 2 karakter (çift blok) yaptık!
                        continue;
                    }
                }
                frame += '  '; // Boşluklar da artık 2 karakter genişliğinde (çift boşluk)
            }
            frame += '\n'; // Satır sonu
        }
        return frame;
    };

    return (
        // Genişliği emojilerin 2 kat kaplamasına göre (WIDTH * 2) + kenarlıklar olarak sabitledik
        <Box flexDirection="column" borderStyle="single" borderColor="cyan" width={(WIDTH * 2) + 2}>
            {/* Üst Panel */}
            <Box justifyContent="space-between" paddingX={1} marginBottom={1}>
                <Text color="yellow" bold>Skor: {score()}</Text>
                <Text color="gray">Boşluk: Zıpla | ESC: Çıkış</Text>
            </Box>

            {/* Oyun Alanı */}
            <Box height={HEIGHT}>
                <Text>{renderGameFrame()}</Text>
            </Box>

            {/* Alt Panel / Oyun Bitti */}
            <Box justifyContent="center" height={2} marginTop={1}>
                {gameOver() ? (
                    <Text color="red" bold>KAYBETTİN! Baştan başlamak için 'R' tuşuna bas.</Text>
                ) : (
                    <Text color="green">Dengede kalmaya çalış!</Text>
                )}
            </Box>
        </Box>
    );
};

render(() => <FlappyBird />);