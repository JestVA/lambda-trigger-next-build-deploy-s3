import dynamic from "next/dynamic";
const NaughtyComponent = dynamic(() => import("../components/naughtyComponents").then(mod => mod.NaughtyComponent), { ssr: false });

const TemplatePage = ({ someId }) => {
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