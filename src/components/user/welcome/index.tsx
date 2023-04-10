

export default function Welcome({ className }: { className: string }) {
    return (
        <div className={`w-full max-w-7xl ${className}`}>
            <div className="max-w-lg">
                <div className="flex gap-5">
                    <div className="flex-shrink-0">
                        <img className="mx-auto h-16 w-16 rounded-full" src={"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="" />
                    </div>
                    <div className="grid place-items-center sm:text-left">
                        <p className="text-sm font-medium text-gray-600 truncate whitespace-pre-line max-w-[13rem] sm:max-w-sm">Bem vindo(a) de volta,
                            <br />
                            <span className="text-xl font-bold text-gray-900 sm:text-2xl truncate">Alice Oliveira Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, animi dolorem expedita aliquid repellendus architecto ea alias delectus voluptas quas, aspernatur quidem minima optio quaerat eos consectetur impedit tempora. Sit obcaecati reiciendis iusto odit officiis tenetur! Non nesciunt ipsa saepe ducimus sint magni, fuga molestiae blanditiis rerum maiores similique dolor!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}