import SideNav from "@/shared/sidenav";
import TextEditor from "@/shared/text-editor";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-60">
        <SideNav />
      </div>
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}
      <div className="flex-grow md:overflow-y-auto">
        <TextEditor />
      </div>
    </div>
  );
}
