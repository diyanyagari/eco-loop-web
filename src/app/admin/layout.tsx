import Sidebar from "./components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="relative min-h-screen flex justify-center">
    //   {/* Wrapper dengan max-width */}
    //   <div className="w-full max-w-sm min-h-screen shadow-md">
    //     <Header />
    //     <div className="px-4">{children}</div>
    //     <AdminNavbar />
    //   </div>
    // </div>

    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-50 h-16 fixed z-1 left-64 w-[calc(100%_-_16rem)] text-white p-4 text-center text-lg font-bold">
        Admin Panel
      </header>

      {/* Body */}
      <div className="relative flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="p-6 relative left-64 top-16 w-[calc(100%_-_16rem)] h-[calc(100dvh_-_4rem)] bg-white">
          {children}
        </main>
      </div>

      {/* Footer */}
      {/* <footer className="bg-blue-600 text-white text-center py-3">
        &copy; 2025 Admin Panel
      </footer> */}
    </div>
  );
}

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // const session = await getAuthUser();
//   // authCheck(session, ["admin"]);

//   return children
// }
