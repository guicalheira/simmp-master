import { PostData } from "@/contexts/posts";
import Sharing from "./sharing";
import Breadnav from "./breadnav";
import ImageGallery from "./ImageGallery";

export default function ({ post }: { post: PostData }) {
   
    return <article className=" mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <Breadnav></Breadnav>
        <div className="common-post">
            <header id="post-title" className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">{post.data.titulo}</h1>
                <address className="flex items-center mb-6 not-italic">
                    <div className="flex flex-col mr-3 text-sm text-gray-900 gap-3">
                        <p className="text-base font-light text-gray-500 -mt-2 dark:text-gray-400"><time>{new Date(post.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</time></p>
                        <p className="text-base font-light text-gray-500 -mt-2 dark:text-gray-400">{post.data.categories.map(s => "#"+s).join(', ')}</p>
                    </div>
                </address>
            </header>
                <img className="rounded-t-lg" src={post.data.capa} alt="" />
            <p className="lead">
                <div dangerouslySetInnerHTML={{ __html: post.data.texto }}></div>
            </p>
            {post.data.galeria.length>0 && <ImageGallery imagens={post.data.galeria}></ImageGallery>}
            <Sharing></Sharing> 
        </div>
    </article>
}