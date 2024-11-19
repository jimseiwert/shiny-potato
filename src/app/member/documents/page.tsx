import withAuth from "@/lib/withAuth/page/server";

async function Documents() {
  return <div>Hello on documents</div>;
}

export default withAuth(Documents);