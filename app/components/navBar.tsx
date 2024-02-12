import { NavLink } from "@remix-run/react";

export default function NavBar() {
  function NavBarLink({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) {
    return (
      <NavLink
        to={to}
        style={{
          background: "white",
          width: "6vh",
          height: "fit-content",
          padding: "1.3vh 1.3vh 1.3vh 1vh",
          boxShadow: "1px 1px 12px 1px #000",
          borderRadius: "0 3vh 3vh 0",
          display: "flex",
          justifyContent: "center",
          
        }}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: "20%",
        color: "darkCyan",
        fontFamily: "monospace",
        fontSize: "2vh",
        fontWeight: 500,
        flexDirection: "column",
        gap: "1.5vh",
        width: "6vh",
      }}
    >
      <NavBarLink to="/">home</NavBarLink>
      <NavBarLink to="/boxes">boxes</NavBarLink>
      <NavBarLink to="/images">images</NavBarLink>
    </div>
  );
}
