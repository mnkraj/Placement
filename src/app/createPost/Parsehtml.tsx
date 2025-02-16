import React from 'react'
import parse from "html-react-parser";
interface RenderHTMLProps {
    content: string;
}

const Parsehtml: React.FC<RenderHTMLProps> = ({ content }) => {
    return (
        <div>
            <div className="prose max-w-none text-white">{parse(content)}</div>
        </div>
    )
}

export default Parsehtml
