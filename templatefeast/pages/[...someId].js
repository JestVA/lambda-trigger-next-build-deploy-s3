import { useEffect } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from 'next/head';
import useHostname from "../useHostname";

const NaughtyComponent = dynamic(() => import("../components/naughtyComponents").then(mod => mod.NaughtyComponent), { ssr: false });

const s3endpoint = "/dummmy.json"

const fetchSomeData = async (endpoint) => {
	const res = await fetch(endpoint);
	const json = await res.json();
	console.log(json);
	return json;
}

const TemplatePage = ({ someId }) => {

	const [ host ] = useHostname();

	const attachAnalytics = (hostname, isDev = false) => {
		const isProd = /servicestatus/.test(hostname)
		// here we need to add the correct attributes (e.g. type and src) and use the logic to decide on src 
		return (
			<script>
				{isDev ? 
				console.log('No scripts, we are in dev') :  
				isProd ? console.log("prod scrypts") : 
				console.log("pre prod scritps")}
			</script>
		)
	}

	useEffect(() => {
		fetchSomeData(s3endpoint);
	}, [])
	
	console.log("We've got someId 🥁" + someId);
	
	return <>
		<Head>
				<title>This is the doc title</title>
				<meta property="og:description" content="Super description" />
				{attachAnalytics(host)}
		</Head>
		<NaughtyComponent someId={someId} />
	</>
};

export default TemplatePage;

export async function getStaticPaths() {
	const myPaths = ["a", "b", "c"];
	const paths = myPaths.map(p => ({
		params: { someId: [p] } 
	}))
	
	return { paths, fallback: false};
}

export async function getStaticProps({ params }) {
	// params have "someId"
	const [someId] = params.someId;
	return { props: { someId }};
}