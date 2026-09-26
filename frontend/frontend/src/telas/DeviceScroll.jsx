import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 25;

function DeviceScroll() {
    const sectionRef = useRef(null);
    const [frame, setFrame] = useState(1);

    useEffect(() => {
        const imagens = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const imagem = new Image();

            imagem.src =
                `/frames/frame-${String(i).padStart(3, "0")}.png`;

            imagens.push(imagem);
        }

        let animationFrame = null;

        function atualizarFrame() {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();

            const alturaScroll =
                section.offsetHeight - window.innerHeight;

            if (alturaScroll <= 0) {
                return;
            }

            const progresso = Math.min(
                Math.max(-rect.top / alturaScroll, 0),
                1
            );

            const novoFrame =
                Math.floor(
                    progresso * TOTAL_FRAMES
                ) + 1;

            setFrame(
                Math.min(
                    novoFrame,
                    TOTAL_FRAMES
                )
            );

            animationFrame = null;
        }

        function handleScroll() {
            if (animationFrame === null) {
                animationFrame =
                    requestAnimationFrame(
                        atualizarFrame
                    );
            }
        }

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        atualizarFrame();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );

            if (animationFrame !== null) {
                cancelAnimationFrame(
                    animationFrame
                );
            }
        };
    }, []);

    const caminhoFrame =
        `/frames/frame-${String(frame).padStart(3, "0")}.png`;

    return (
        <section
            ref={sectionRef}
            className="device-scroll"
        >
            <div className="device-scroll-sticky">
                <img
                    src={caminhoFrame}
                    alt="Dispositivo CECODE"
                />
            </div>
        </section>
    );
}

export default DeviceScroll;