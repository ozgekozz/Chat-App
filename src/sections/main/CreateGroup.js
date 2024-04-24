import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, Typography } from '@mui/material'
import * as Yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { XCircle } from 'phosphor-react';

const MEMBERS = ["Name 1", "Name 2", "Name 3"];

// TODO => Create a reusable comp
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, "Must have at least 2 members"),
    });

    const defaultValues = {
        title: "",
        members: [],
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // API Call
            console.log("DATA", data);

        }
        catch (error) {
            console.log("error", error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                <RHFTextField name="title" label="Title" />
                <RHFAutocomplete
                    name="members"
                    label="Members"
                    multiple
                    freeSolo
                    options={MEMBERS.map((option) => option)}
                    ChipProps={{ size: "medium" }}
                />
                <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"end"}
                >
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
};

const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
            onClose={handleClose}
        >
            {/* Title */}
            <DialogTitle sx={{ mb: 1 }}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="h6">Create New Group</Typography>
                    <IconButton onClick={handleClose}>
                        <XCircle />
                    </IconButton>
                </Stack>
            </DialogTitle>
            {/* Content */}
            <DialogContent>
                {/* Form */}
                <CreateGroupForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroup