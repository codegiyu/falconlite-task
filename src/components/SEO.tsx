import { Helmet } from "react-helmet-async";

export interface SEOProps {
    title: string;
    desc: string;
}

interface Props {
    seoProps: SEOProps;
}

const SEO: React.FC<Props> = (props) => {
    let {title, desc} = props.seoProps

    return (
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ desc } />
        </Helmet>
    )
}

export default SEO