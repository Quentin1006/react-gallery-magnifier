export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <div>
          <h1>Header</h1>
          <hr />
          {children}
          <hr />
          <div>Footer</div>
        </div>
      </body>
    </html>
  );
}
