import React, { useCallback } from 'react'
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Avatar, Button, Stack } from '@mui/material'
import { RHFTextField } from '../../components/hook-form'

const ProfileForm = () => {

    const ProfileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        name: "",
        about: "",
    };

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setError,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const values = watch();
    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        if (file) {
            setValue("avatarUrl", newFile, { shouldValidate: true });
        };

    }, [setValue])

    const onSubmit = async (data) => {
        try {
            // submit data to backend 
            console.log("Data", data)
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    };

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3}>
                <Stack justifyContent={"center"} alignItems={"center"} sx={{ mb: 2 }}>
                    <Avatar sx={{ width: 120, height: 120 }} />
                </Stack>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                    <RHFTextField
                        name="name"
                        label="Name"
                        helperText={"This name is visible to your contacts"}
                    />
                    <RHFTextField
                        multiline
                        rows={3}
                        maxRows={5}
                        name="about"
                        label="About"
                    />
                </Stack>
                <Stack direction={"row"} justifyContent={"end"}>
                    <Button
                        color="primary"
                        size="medium"
                        type="submit"
                        variant="outlined"
                        sx={{ width: "55%" }}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default ProfileForm