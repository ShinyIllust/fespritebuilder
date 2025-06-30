function Footer(){
    return (
        <div className="col-span-4 grid grid-cols-subgrid mt-10">
            <div className="col-span-2">
                <p>Version 1.1.0</p>
            </div>
            <div className="col-span-2 text-xs">
                <p>FE Sprite Builder by Shiny and Phalconid.</p>
                <p>Contact Me: <a className="text-[#131F42]" target="_blank" href="https://bsky.app/profile/shinyillust.bsky.social">@ShinyIllust on Bluesky.</a></p>
                <p>For more resources: <a className="text-[#131F42]" target="_blank" href="https://discord.gg/kx5jSfH">Swords & Supports Tabletop Discord</a></p>
                <p>-</p>
                <p>(Most) Original Sprites by Intelligent Systems.</p>
                <p>This is a free resource. Do not use commercially.</p>
            </div>
        </div>
    )
}

export default Footer;