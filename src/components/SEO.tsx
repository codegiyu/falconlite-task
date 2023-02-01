import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    desc: string;
}

const SEO: React.FC<SEOProps> = (props) => {
    let {title, desc} = props

    return (
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ desc } />
        </Helmet>
    )
}

export default SEO