import { asyncHandler } from "../utlis/asyncHandler.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { chatWithDocs } from "../services/chat.services.js";

const chatController = asyncHandler(async (req, res) => {
  const { userQuery, fileName } = req.body;

  try {
    const response = await chatWithDocs(userQuery, fileName);
    return res
      .status(200)
      .json(new ApiResponse(200, response, await chatWithDocs(userQuery, fileName)));
  } catch (error) {
    console.error("Chat Error:", error);
    return res
      .status(400)
      .json(new ApiResponse(400, null, error.message || "Invalid request"));
  }
});


export { chatController };