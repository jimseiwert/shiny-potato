import withAuth from "@/lib/withAuth/page/server";

async function Fishing() {
  return <div>Hello on fishing</div>;
}

export default withAuth(Fishing);