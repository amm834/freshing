import {useSignal} from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import axios from "npm:axios"
import {Handlers, PageProps} from "https://deno.land/x/fresh@1.3.1/src/server/types.ts";
import {parse, stringify, parseAllDocuments} from 'npm:yaml'

interface HomeProps {
    title: string;
    posts: string[];
}

export const handler: Handlers<HomeProps> = {
    async GET(_req, ctx) {
        const random = Math.floor(Math.random() * 10);
        const posts = []

        for await (const dirEntry of Deno.readDir("./content")) {
            const file = await Deno.readTextFile(`./content/${dirEntry.name}`);
            posts.push(parseAllDocuments(file))
        }

        const res = await axios.get<HomeProps>(`https://jsonplaceholder.typicode.com/todos/${random}`).then((res) => res.data)
        if (!res) {
            return new Response("Project not found", {status: 404});
        }
        return ctx.render({
            title: res.title,
            posts: [...posts]
        });
    },
};


export default function Home(props: PageProps<HomeProps>) {
    const count = useSignal(3);
    console.log(props.data.posts)

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac]">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                <img
                    class="my-6"
                    src="/logo.svg"
                    width="128"
                    height="128"
                    alt="the Fresh logo: a sliced lemon dripping with juice"
                />
                <h1 class="text-4xl font-bold">Welcome to {props.data.title}</h1>
                <p class="my-4">
                    Try updating this message in the
                    <code class="mx-2">./routes/index.tsx</code> file, and refresh.
                </p>
                <Counter count={count}/>
                <a href="/about" className="bg-red-500 text-white px-3 py-1.5 rounded">About Page</a>
                <div>
                    {props.data.posts.map(post => post[0])
                        .map((post) => (
                            <div>
                                <p>{
                                    post.get("title")
                                }</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
