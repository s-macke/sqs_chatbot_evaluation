module.exports = async function (varName, prompt, otherVars) {

  question = otherVars['inquiry']

  const res = await fetch('http://simulationcorner.net:54663/v1/graphql', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "query": `{ Get { Articles ( limit: 3 nearText: { concepts: ["${question}"], } ) { content } } }` }),
  });

  let documents = "";
  (await res.json()).data.Get.Articles.forEach(
      (article) => (documents += article.content + "\n\n")
  )
  console.log(documents);
  console.log("Request done");

  question = otherVars['inquiry']
  console.log("\n== " + question + " ==\n")
  console.log("\nvarName:", varName, "\nprompt:", prompt)
  //console.log("\notherVars:", otherVars)

  if (varName !== 'context') {
    return { error: `Unknown variable name: ${varName}` }
  }

  // Return value based on the variable name and test context
  return {
      output: `... Documents for ${otherVars.inquiry} for prompt: ${prompt} ...`
  };

};
