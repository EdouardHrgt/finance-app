import fetchDatas from "../utils/fetchDatas";
const users = await fetchDatas("http://localhost:3000/api/users");
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