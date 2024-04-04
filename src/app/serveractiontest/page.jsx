import { addPost, deletePost } from "@/lib/actions";
const ServerActionTextPage = () => {
  const actionInComponent = async () => {
    "use server";
    console.log("Hello from server action");
  };
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="description" name="description" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="userId" name="userId" />
        <button>Create</button>
      </form>
      <form action={deletePost}>
        <input type="text" placeholder="postId" name="id" />
        <button>Delete</button>
      </form>
    </div>
  );
};
export default ServerActionTextPage;
//When clicking on create button we are going to take all the form data as a prop
