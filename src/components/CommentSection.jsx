import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

function CommentSection({ leadId }) {

  // Get comments
  const {
    data: comments,
    loading,
    error
  } = useFetch(
    `https://anvaya-backend-omega.vercel.app/api/leads/${leadId}/comments`
  );

  // Get sales agents
  const {
    data: agents,
    loading: agentsLoading
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/agents"
  );

  const [commentText, setCommentText] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  async function handleAddComment() {

    if (!selectedAgent) {
      toast.success("Please select a sales agent.");
      return;
    }

    if (!commentText.trim()) {
      toast.warning("Please enter a comment.");
      return;
    }

    try {

      setAddingComment(true);

      const response = await fetch(
        `https://anvaya-backend-omega.vercel.app/api/leads/${leadId}/comments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            author: selectedAgent,
            commentText: commentText
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      setCommentText("");
      setSelectedAgent("");

      window.location.reload();

    } catch (error) {

      console.log("Failed to add comment", error);
      toast.error("Failed to add comment.");

    } finally {

      setAddingComment(false);

    }
  }

  if (loading || agentsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        <h3 className="mb-4">
          Comments
        </h3>

        {/* Existing comments */}

        {!Array.isArray(comments) ||
        comments.length === 0 ? (

          <p>No comments yet.</p>

        ) : (

          comments.map((comment) => (

            <div
              key={comment.id}
              className="border-bottom pb-3 mb-3"
            >

              <strong>
                {comment.author}
              </strong>

              <small className="text-muted ms-2">
                {new Date(
                  comment.createdAt
                ).toLocaleString()}
              </small>

              <p className="mt-2">
                {comment.commentText}
              </p>

            </div>

          ))

        )}

        {/* Select Agent */}

        <label className="form-label mt-3">
          Commenting as
        </label>

        <select
          className="form-select"
          value={selectedAgent}
          onChange={(e) =>
        setSelectedAgent(e.target.value)
          }
        >

          <option value="">
            Select Sales Agent
          </option>

          {agents?.map((agent) => (

            <option
              key={agent._id}
              value={agent._id}
            >
              {agent.name}
            </option>

          ))}

        </select>

        {/* Comment input */}

        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) =>
            setCommentText(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={handleAddComment}
          disabled={addingComment}
        >
          {addingComment
            ? "Adding..."
            : "Add Comment"}
        </button>

      </div>

    </div>
  );
}

export default CommentSection;