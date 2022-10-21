import React, { useEffect, useState } from 'react'
import { Box, Input, Button, Stack } from '@mui/material';
import axios from 'axios'
import { User } from '../store/slice/user.slice'
import { update } from '../store/slice/user.slice';
import { success } from '../store/slice/notification.slice';
import { useAppDispatch } from '../hooks';
import PDFView from './PDFView';
interface ProfilePDFProps {
    user: User,
    token: string
}

const ProfilePDF = (props: ProfilePDFProps) => {
    const { user, token } = props
    const dispatch = useAppDispatch()
    const [pdfUrl, setPdfUrl] = useState<string>("")

    const handleChange = (files: any) => {
        const selectedFile = files[0]


        if (selectedFile) {
            let reader = new FileReader()

            reader.readAsDataURL(selectedFile)
            reader.onload = (e) => {
                // setPdf(e.target.result)
            }

            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("upload_preset", "hrms_client")


            axios.post("https://api.cloudinary.com/v1_1/sangtran127/image/upload", formData).then((res) => {

                console.log(res.data.url);
                setPdfUrl(res.data.url);
                console.log(pdfUrl);
            }).catch((err) => console.log(err))
        }
    }
    const handleSubmitPDF = () => {
        const params = {
            data: {
                current_resume_url: pdfUrl
            },
            token
        }
        dispatch(update(params)).then(() => {
            dispatch(success("Upload CV thành công"))

        }).catch(err => console.log(err))
    }
    useEffect(() => {

    }, [dispatch, pdfUrl, setPdfUrl])
    return (
        <Box mt={3} sx={{ width: '100%' }}>
            {
                !user.current_resume_url && <h2>Hiện tại bạn chưa có CV, vui lòng bổ sung CV để ứng tuyển</h2>
            }
            {
                user.current_resume_url && <PDFView pdf={user.current_resume_url} />
            }
            <Stack direction="row" gap={4}>
                <input
                    // ref={inputFileRef}
                    style={{
                        display: 'block'
                    }}
                    accept="application/pdf"
                    hidden
                    id="cv-pdf-upload"
                    type="file"
                    onChange={(event) => handleChange(event.target.files)}
                />

                <Button onClick={handleSubmitPDF}>Nộp CV</Button>
            </Stack>
        </Box>
    )
}

export default ProfilePDF