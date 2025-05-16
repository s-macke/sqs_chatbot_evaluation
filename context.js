module.exports = async function (varName, prompt, otherVars) {

  question = otherVars['query']

  const res = await fetch('http://simulationcorner.net:54663/v1/graphql', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "query": `{ Get { Document ( limit: 3 hybrid: { query: "${question}", alpha: 0.5, } ) { content } } }` }),
  });

  let response = await res.json()

  let documents = "";
  response.data.Get.Document.forEach(
      (doc) => (documents += doc.content + "\n\n")
  )

  if (varName !== 'context') {
    return { error: `Unknown variable name: ${varName}` }
  }

  // Return value based on the variable name and test context
  return {
      output: documents
  };

};
