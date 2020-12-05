export const octopartSearch = async (query) => {

    const result = await fetch('http://octopart.lokalnetz.com?q=' + query);
    const data = await result.json();
    console.log(data);
    return (result.status !== 200) ? null : data.results;
};
