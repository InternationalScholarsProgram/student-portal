import { usePDF } from "react-to-pdf";
import useThemeStore from "../styles/theme.store";
import { useEffect, useState } from "react";


const Test = () => {
  const { themeMode, setDarkTheme, setLightTheme } = useThemeStore();
  const [initialTheme, setInitialTheme] = useState(themeMode);

  const switchToBack = () => {
    if (initialTheme === "dark") setLightTheme();
  };

  useEffect(() => {
    setInitialTheme(themeMode);
  }, []);

  const { toPDF, targetRef } = usePDF({
    method: "open",
  });
  const handleDownload = async () => {
    // Generate the PDF
    setDarkTheme();
    const blob = await toPDF({
      method: "save",
    });

    console.log(typeof blob);

    switchToBack();
  };

  return (
    <div>
      <div ref={targetRef}>
        {/* The content to be converted to PDF */}
        <h1>Hello, PDF!</h1>
        <p>This content will be converted to a PDF.</p>
      </div>
      <button onClick={handleDownload}>Generate and Save PDF</button>
    </div>
  );
};

export default Test;
