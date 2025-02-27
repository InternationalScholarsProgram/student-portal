import { html2pdf } from "../utils/utils";
import { ispLogo } from "../assets/imageLinks";
import { useEffect } from "react";

function Test() {
  function convertImageToBase64(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Prevents CORS issues if the image is hosted elsewhere
      img.src = url;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png"); // Converts image to Base64

        resolve(dataURL); // Return Base64 image
      };

      img.onerror = reject; // Handle errors
    });
  }

  function generatePDF() {
    const element = document.getElementById("pdf-content");

    html2pdf()
      .set({
        margin: [45, 10, 50, 10], // Top margin for the first page
        filename: "document_with_letterhead.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(element)
      .toPdf()
      .get("pdf")
      .then(async function (pdf: any) {
        const totalPages = pdf.internal.getNumberOfPages();

        const header = await convertImageToBase64(
          "https://internationalscholars.qhtestingserver.com/logo/scholars-logo.png"
        );
        const footer = await convertImageToBase64(
          "/src/assets/Footer_Letterhead.png"
        );
        console.log(pdf.internal.pageSize.getWidth(), "width");
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.addImage(header, "PNG", 5, 0, 40, 40);
          pdf.addImage(
            footer,
            "PNG",
            0,
            pdf.internal.pageSize.getHeight() - 40,
            pdf.internal.pageSize.getWidth(),
            40
          );
        }

        pdf.save("document_with_letterhead.pdf");
      });
  }

  // useEffect(() => {
  //   generatePDF();
  // }, []);

  return (
    <div id="pdf-content" className="contract">
      <div className="letterhead">
        <p>Your Company Name</p>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div className="page home">
        <h1>Welcome to Home Page</h1>
        <p>
          This is the home page where you can find the latest updates and
          information about our services.
        </p>
        <section>
          <h2>Featured Section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae malesuada nulla. Vestibulum at neque ut turpis fermentum
            viverra.
          </p>
        </section>
        <footer>
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
      <div id="pdf-content">
        <div className="content">
          <p>This is page 1 content.</p>
        </div>
        <div className="page"></div>
        <div className="content">
          <p>This is page 2 content.</p>
        </div>
        <div className="page"></div>
        <div className="content">
          <p>This is page 3 content.</p>
        </div>
      </div>
      <button onClick={generatePDF}> Generate PDF</button>
    </div>
  );
}

export default Test;
