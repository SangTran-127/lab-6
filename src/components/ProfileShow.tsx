import React, { useState, createRef } from 'react'

// mui
import { Button, Box, Avatar, Divider, ListItemButton, Typography, AppBar, Tabs, Tab, Container, Stack, TextField } from '@mui/material'


import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import { useFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../hooks'
import { success } from '../store/slice/notification.slice'
import { update } from '../store/slice/user.slice'
import { errorHelper } from '../utils/tool'
import ProfilePDF from './ProfilePDF';
interface ProfileShowProps {

}
interface FormikUpdate {
    fullname: string;
    email: string;
    address: string;
    phone: string;
}

const ProfileShow = (props: ProfileShowProps) => {

    const { user, token } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [image, setImage] = useState<string | undefined>(undefined);
    const inputFileRef = createRef<HTMLInputElement>();
    const [disabledInput, setDisableInput] = useState<boolean>(true)
    const formik: FormikProps<FormikUpdate> = useFormik<FormikUpdate>({
        initialValues: {
            fullname: user?.fullname as string,
            email: user?.email as string,
            // phone: user?.phone,
            address: user?.address ? user?.address : "Cần cập nhật thông tin",
            phone: user?.phone ? user?.phone : "Cần cập nhật thông tin"
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().min(6, 'Họ và tên người dùng phải dài hơn 6 kí tự.').required('Họ và tên không được bỏ trống'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
            address: Yup.string(),
            phone: Yup.string().min(10).max(13).required('Phone is required'),
        }),
        onSubmit: (values) => {
            const { fullname, email, address, phone } = values

            const params = {
                data: {
                    fullname,
                    email,
                    address,
                    phone,
                    avatar: image
                },
                token: token
            }
            console.log(params.data.avatar);

            dispatch(update(params))
                .then(() => {
                    dispatch(success('Update thành công'));
                    setDisableInput(true)
                })

        }
    })
    const handleOnChange = (files: any) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "hrms_client")
        axios.post("https://api.cloudinary.com/v1_1/sangtran127/image/upload", formData).then((res) => {
            // checkImg(res.data.url)
            setImage(res.data.url)
            // console.log(res.data.url);
        })
    }
    const cleanup = () => {
        if (inputFileRef.current !== null) {
            inputFileRef.current.value = "";
        }

    };
    const checkImg = (newImage: string) => {
        if (image) {
            cleanup()
        }
        setImage(newImage)
    }
    const handleClick = (event: React.SyntheticEvent) => {
        if (image) {
            event.preventDefault();
            setImage(undefined);
        }

    }
    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='1400px' margin='0 auto' height='100%' mt={3}>
            <Stack gap={3} width='1000px'>
                <Box>
                    <Typography component='h1' variant='h4'>
                        Thông tin cá nhân
                    </Typography>
                    <Box display='flex' gap={2} mt={5}>
                        <Box className='left'>
                            <Avatar
                                sx={{
                                    width: '300px',
                                    height: '300px',
                                    borderRadius: '10px'
                                }}
                                alt={user?.fullname}
                                src={!image ? user?.avatar : image}
                                variant='square'
                                imgProps={{
                                    style: {
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "cover",
                                    },
                                }}
                            />
                            <input
                                // ref={inputFileRef}
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                // hidden
                                id="avatar-image-upload"
                                type="file"
                                onChange={(event) => handleOnChange((event.target as HTMLInputElement).files)}
                            />
                            <label htmlFor="avatar-image-upload">
                                <Button onClick={handleClick} sx={{ color: '#111111' }}>
                                    {image ? "Delete" : "Upload"}
                                </Button>
                            </label>
                        </Box>
                        <Box className='right' sx={{ width: '100%' }}>
                            <form onSubmit={formik.handleSubmit}>
                                <Stack>
                                    <Typography>Họ và tên:</Typography>
                                    <TextField
                                        disabled={disabledInput}
                                        fullWidth
                                        {...formik.getFieldProps('fullname')}
                                        {...errorHelper(formik, 'fullname')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Email:</Typography>
                                    <TextField disabled={disabledInput}
                                        fullWidth
                                        {...formik.getFieldProps('email')}
                                        {...errorHelper(formik, 'email')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Số điện thoại:</Typography>
                                    <TextField disabled={disabledInput}
                                        fullWidth
                                        {...formik.getFieldProps('phone')}
                                        {...errorHelper(formik, 'phone')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Description:</Typography>
                                    <TextField disabled={disabledInput} multiline
                                        fullWidth
                                        {...formik.getFieldProps('address')}
                                        {...errorHelper(formik, 'address')}
                                    />
                                </Stack>
                                <Stack direction="row" justifyContent='space-between' mt={2} >
                                    <Button

                                        sx={{
                                            color: '#111111',
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: `${disabledInput ? '#45CE7C' : '#F32424'}`,
                                                color: '#ffffff'
                                            }
                                        }}
                                        onClick={() => setDisableInput(!disabledInput)}
                                    >{disabledInput ? 'Chỉnh sửa thông tin' : 'Huỷ bỏ'}</Button>

                                    {
                                        !disabledInput && <Button type="submit" size='large'
                                            sx={{
                                                color: '#111111', borderRadius: '10px', padding: '1 2rem',
                                                '&:hover': {
                                                    backgroundColor: '#125C13',
                                                    color: '#ffffff'
                                                }
                                            }}
                                        >Confirm</Button>
                                    }

                                </Stack>
                            </form>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box>
                    <Typography component='h1' variant='h4'>
                        Thông tin CV
                    </Typography>
                    {
                        (user && token) && <ProfilePDF user={user} token={token} />
                    }
                </Box>
            </Stack>
        </Box >
    )
}

export default ProfileShow