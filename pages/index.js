import Image from "next/image";
import React, { useRef } from 'react'

// imports to download the page into pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import data from '../utils/data.json'

export default function Home() {

  console.log(data.company_name)

  const pdfRef = useRef();

  const generatePDF = () => {
    const input = pdfRef.current;

    // Use html2canvas to capture the content of the specified HTML element
    html2canvas(input).then((canvas) => {
      // Convert the canvas to a data URL representing a PNG image
      const imgData = canvas.toDataURL('image/png');

      // Create a new jsPDF instance with A4 page dimensions and set it to be in portrait mode
      const pdf = new jsPDF('p', 'mm', 'a4', true);

      // Get the width and height of the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Get the width and height of the captured image
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate a scaling ratio to fit the image within the PDF page dimensions
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // Calculate the x-coordinate to center the image on the PDF page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      // Calculate the y-coordinate to place the image at the top of the PDF page (change if needed)
      const imgY = 0;
      // const imgY = 30;

      // Add the captured image to the PDF, scaling it according to the calculated ratio
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Save the PDF with the specified filename
      pdf.save('payslip.pdf');
    });
  };


  return (
    <>
      <main ref={pdfRef} className="border-t-8 border-blue-500" >
        <div className="px-20 py-5">

          <section className="flex justify-between">
            <div>
              <h2 className="font-bold text-2xl">{data.company_name}</h2>
              <p className="font-medium">{data.company_address}</p>
            </div>
            <div className="my-auto">
              <Image
                src={data.company_logo}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </div>
          </section>

          <div className="w-full border-2 border-blue-400 my-5"></div>

          <section>
            <h4 className="font-bold text-xl">Payslip for the month of {data.pay_period}</h4>
            <h5 className="py-3 tracking-wide text-blue-500 font-bold">EMPLOYEE PAY SUMMARY</h5>
            <div className="flex">
              <div className="w-6/12">
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Employee Name:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.employee_name}</p></div>
                </div>
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Designation:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.employee_designation}</p></div>
                </div>
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Date of Joining:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.date_of_joining}</p></div>
                </div>
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Pay Period:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.pay_period}</p></div>
                </div>
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Pay Date:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.pay_date}</p></div>
                </div>
                <div className="flex pb-2">
                  <div className="w-4/12"><h6 className="text-gray-500 font-semibold">Bank Account No:</h6></div>
                  <div className="w-8/12"><p className="font-semibold">{data.bank_account_no}</p></div>
                </div>

              </div>

              <div className="6/12 m-auto">
                <h4 className="text-lg font-semibold text-center">Employee Net Pay</h4>
                <h2 className="pt-2 pb-4 font-bold text-5xl text-center">{data.earnings.total_net_pay}</h2>
                <p className="tracking-wide font-medium text-gray-500 text-center">Paid Days : {data.paid_days} | LOP Days : {data.lop_days}</p>
              </div>
            </div>
          </section>

          <div className="w-full border-2 border-blue-400 my-5"></div>

          <section>
            <table className="mt-4 border-collapse  border-gray-300 w-full">
              <thead>
                <tr>
                  <td className="p-2 w-7/12 tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">EARNINGS</td>
                  <td className="p-2 text-right tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">AMOUNT</td>
                  <td className="p-2 text-right tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">YTD</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Basic</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.basic_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.basic_ytd}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Fixed Allowance</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.fixed_allowance_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.fixed_allowance_ytd}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Leave Encashment</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.leave_encashment_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.leave_encashment_ytd}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Bonus</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.bonus_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.bonus_ytd}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Commission</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.commission_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.commission_ytd}</td>
                </tr>
                <tr>
                  <td className="p-2 font-extrabold">Gross Earnings</td>
                  <td className="p-2 font-extrabold text-right">{data.earnings.gross_earnings_amount}</td>
                  <td className="p-2 font-semibold text-right">{data.earnings.gross_earnings_ytd}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <div className="w-full border-2 border-blue-400 my-5"></div>

          <section>
            <table className="mt-4 border-collapse  border-gray-300 w-full">
              <thead>
                <tr>
                  <td className="p-2 w-7/12 tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">DEDUCTIONS</td>
                  <td className="p-2 text-right tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">(-)AMOUNT</td>
                  <td className="p-2 text-right tracking-wide text-blue-500 font-bold border-b border-dotted border-gray-500">YTD</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-lg font-bold">Total Deductions</td>
                  <td className="p-2 text-lg font-bold text-right">{data.earnings.total_deductions_amount}</td>
                  <td className="p-2 text-lg font-bold text-right">{data.earnings.total_deductions_ytd}</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-2 text-lg font-bold">NET PAY (Gross Earnings - Total Deductions)</td>
                  <td className="p-2 text-lg font-bold text-right">{data.earnings.total_net_pay}</td>
                  <td className="p-2 text-lg font-bold text-right"></td>
                </tr>
              </tbody>
            </table>

            <p className="pt-10 pb-5 text-2xl font-medium text-center">Total Net Payable <span className="font-bold">{data.earnings.total_net_pay}</span> <span className="text-lg">(Indian Rupee {data.earnings.total_net_pay_inwords} Only)</span></p>
          </section>

          <div className="w-full border-2 border-blue-400 my-5"></div>

        </div>

        <p className="text-center text-xs font-medium text-gray-400 py-20">-- This document has been automatically generated by Zoho Payroll; therefore, a signature is not required. --</p>

      </main>

      <div className='flex justify-center py-10'>
        <button
          onClick={generatePDF}
          className='px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:rounded-md'>Download PDF</button>
      </div>

    </>
  );
}
