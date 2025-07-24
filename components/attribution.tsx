export function Attribution() {
  return (
    <div className="border-t pt-6 space-y-4">
      <p>
        Data Source:{' '}
        <a
          href="https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline font-semibold"
        >
          PAGASA
        </a>
      </p>

      <p>
        Made by{' '}
        <a
          href="https://jeffsegovia.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500"
        >
          Jeff Segovia
        </a>{' '}
        &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
