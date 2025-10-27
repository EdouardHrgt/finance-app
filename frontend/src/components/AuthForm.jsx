import fetchDatas from "../utils/fetchDatas";
const apiUrl = import.meta.env.VITE_API_URL;
const users = await fetchDatas(`${apiUrl}/api/users`);
console.log(users);

function AuthForm() {
  return (
    <div>
        <form>
            <input type="text"/>
        </form>
    </div>
  );
}

export default AuthForm;