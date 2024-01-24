import Image from "next/image"

export const HomeHero = () => {
    return(
        <section>
            <h2 id="welcome-title" className="hidden">Seja bem-vindo ao Painel AWTI !!</h2>
            <Image 
                src="https://media.discordapp.net/attachments/1182108710965870744/1192518457904865331/CMALogoDiscord2.png"
                alt="Logo"
                width={1000}
                height={750}
            />
        </section>
    )
}