import { gitUser } from "../data/data";
import { parseReadme } from "../utils/index";
export function fetchReadmeHeader(repoName) {
  return fetch(`https://api.github.com/repos/${gitUser}/${repoName}/readme`)
    .then(res => res.json())
    .then(json => {
      let readmeContents = Object.keys(parseReadme(atob(json.content)))[0];
      readmeContents = readmeContents
        ? readmeContents
        : `pxblue ${repoName}`
            .split(" ")
            .map(e => e[0].toUpperCase() + e.substr(1))
            .join(" ");
      return readmeContents;
    });
  //   return fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
  //     res.json()
  //   );
}

export function fetchNpmData(packageName) {
  return fetch(`https://api.npms.io/v2/package/%40pxblue%2F${packageName}`)
    .then(res => res.json())
    .then(json => {
      let readmeContents = parseReadme(json.collected.metadata.readme);
      let data;
      try {
        data = {
          title: Object.keys(readmeContents)[0]
            ? Object.keys(readmeContents)[0]
            : packageName,
          desc: Object.keys(readmeContents)[0]
            ? readmeContents[Object.keys(readmeContents)[0]].raw.substr(
                readmeContents[Object.keys(readmeContents)[0]].raw.indexOf(
                  "This"
                )
              )
            : "",
          link: `https://www.npmjs.com/package/@pxblue/${packageName}`,
          version: json.collected.metadata.version
        };
      } catch (e) {
      } finally {
        return data;
      }
    });
}

// import { gitUser } from "../data/data";
// import { useState, useEffect } from "react";
// function useFetch(repoName) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   async function fetchUrl() {
//     const response = await fetch(
//       `https://api.github.com/repos/${gitUser}/${repoName}/readme`
//     );
//     const json = await response.json();
//     setData(json);
//     setLoading(false);
//   }
//   useEffect(() => {
//     fetchUrl();
//   }, []);
//   return [data, loading];
// }
// export { useFetch };
