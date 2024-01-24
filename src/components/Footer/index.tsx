'use client'
import { useEffect, useState } from "react";

export const Footer = () => {
    const [index, setIndex] = useState(0);
    const mensagens =
        ["'Existem duas palavras que abrem muitas portas: Puxe e Empurre' - Cooper, Astrid.",
            "'Irritantemente adorável, apaixonante complicado... Desculpe, eu sou de Gêmeos.' - Santos, Edson",
            "'Você pode saber o que disse, mas nunca o que o outro escutou.' - Cooper, Peichoto Moraes",
            "'Ser feliz sem motivo é a mais autêntica forma de felicidade' - Cooper, Dudu",
            "'Amigo é aquele que sabe tudo a seu respeito e, mesmo assim, ainda gosta de você' - Cooper, Thomas",
            "'Comigo levo somente o que contribui para a minha evolução' - Belkin, Dylan",
            "'O valor das coisas não está no tempo que elas duram, mas na intensidade com que acontecem. Por isso existem momentos inesquecíveis, coisas inexplicáveis e pessoas incomparáveis' - Cooper, Dudu",
            "'As pessoas subestimam os jovens, pensando que eles são ingênuos .' - Swift, Taylor.",
            "'Abra asas como uma borboleta... voe, voe... só não bata no poste!' - Ramon, Kiara.",
            "'Conquistas não caem do céu. Elas exigem muita luta, esforço e força de vontade.' - Cooper, Descubra Qual.",
            "'Na vida, tudo e passageiro, menos o cobrador e o motorista.' - Helena, Zoe",
            "'Eu não me envergonho de corrigir os meus erros e mudar de opinião, porque não me envergonho de raciocinar e aprender.' - Ripa, Otavio",
            "'Os portugueses sempre adoraram o concreto. Entendem o abstrato, mas procuram traduzir imediatamente em concreto..' - Cooper, Astrid",
            "'Nunca cometer o mesmo erro duas vezes… Cometa umas cinco vezes, só pra ter certeza que é errado mesmo!' - Ripa, Otávio",
            "'Se você não perseguir o que deseja, nunca o terá. Se você não perguntar, a resposta é sempre não. Se você não der um passo à frente, estará sempre no mesmo lugar!!!!' - Ubal, Cyndi 👀"
        ];
        useEffect(() => {
            const interval = setInterval(() => {
                if (index < mensagens.length - 1) {
                    setIndex(index + 1);
                } else {
                    setIndex(0);
                }
            }, 3000); // Run the loop every 3 seconds
        
            return () => clearInterval(interval); // Clear the interval when the component unmounts
        }, [index, mensagens]);

    return (
        <footer>
            Todos os Direitos Reservados ao <b>Tiago SUCCI</b> e <b>Centro Médico Awti</b> ©2024
            <div id="extra-messages-container">
                <p>{mensagens[index]}</p>
            </div>
        </footer>
    )
}