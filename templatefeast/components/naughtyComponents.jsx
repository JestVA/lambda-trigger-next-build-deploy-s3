export const NaughtyComponent = ({ someId }) => {
	
	// do something stupid with the window dependency

	return <div>I am naughty by default as I try to use the window object {window.btoa(`WHYYYYY ${someId}`)}</div>;
}