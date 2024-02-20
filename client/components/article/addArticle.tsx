import React, {useContext, useEffect, useState} from "react";
import {ArticleContext} from "./articleContext";
import {useNavigate} from "react-router-dom";

export function AddArticle(){
    const [headline, setHeadline] = useState("");
    const [article, setArticle] = useState("");
    const [category, setCategory] = useState("Tech");
    const [author, setAuthor] = useState("");
    const [webSocket, setWebsocket] = useState<WebSocket>();

    const navigate = useNavigate();

    const { onNewArticle } = useContext(ArticleContext);

    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();

        webSocket?.send("New Article Added");
        await onNewArticle({ headline, article, category, author });

        navigate("/articles");
    }
    useEffect(() => {
        setWebsocket(new WebSocket(window.location.origin.replace(/^http/, "ws")));
    }, []);
    return(
        <form onSubmit={handleSubmit}>
            <h1>Add Article</h1>
            <div>
                Headline:<br/>
                <input value={headline} onChange={(e) => setHeadline(e.target.value)}/><br/>
                Article:<br/>
                <textarea value={article} onChange={(e) => setArticle(e.target.value)}/><br/>
                Category:<br/>
                <select name={category} defaultValue={"Tech"} onChange={(e) => setCategory(e.target.value)} >
                    <option value={"Tech"}>Tech</option>
                    <option value={"Literature"}>Literature</option>
                    <option value={"World"}>World</option>
                </select><br/>
                Author:<br/>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    );
}