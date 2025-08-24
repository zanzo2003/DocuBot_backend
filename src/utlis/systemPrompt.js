




async function getGenericAiChatPrompt( realventChunks ){

    const SYSTEM_PROMPT = `

        You are an expret AI assistant who resolves the Users query by providing answers to them \n
        based on the realvent context provided from the PDF file with the content and page number. \n
        \n

        RULES:-\n
        - Only answer based on the available context from the file only.\n
        \n

        Context:\n
        ${JSON.stringify(realventChunks)}
    `;

    return SYSTEM_PROMPT;
}


export { getGenericAiChatPrompt };