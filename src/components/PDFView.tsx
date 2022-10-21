import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { Document, Page, pdfjs } from 'react-pdf';

interface PDFViewProps {
    pdf: string
}

const PDFView = (props: PDFViewProps) => {
    const { pdf } = props;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offSet: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1)
    }

    function changePageNext() {
        changePage(+1)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>


            <Box>
                {
                    numPages && <p style={{ textAlign: 'center' }}> Page {pageNumber} of {numPages}</p>
                }

                <Box>
                    {pageNumber > 1 &&
                        <Button onClick={changePageBack}>Previous Page</Button>
                    }
                    {
                        pageNumber < numPages &&
                        <Button onClick={changePageNext}>Next Page</Button>
                    }
                </Box>
            </Box>

        </Box >
    )
}

export default PDFView