import { useEffect } from 'react';
import dynamic from "next/dynamic";
const NaughtyComponent = dynamic(() => import("../components/naughtyComponents").then(mod => mod.NaughtyComponent), { ssr: false });

const s3endpoint = "https://json-data-file.s3.us-east-2.amazonaws.com/dummmy.json"

const fetchSomeData = async (endpoint) => {
	const res = await fetch(endpoint);
	const json = await res.json();
	console.log(json);
	return json;
}

const TemplatePage = ({ someId }) => {

	useEffect(() => {
		fetchSomeData(s3endpoint);
	}, [])
	console.log("We've got someId 🥁" + someId);
	return <>
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