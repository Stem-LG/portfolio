import {
    Box,
    useTheme,
    Dialog,
    useMediaQuery,
    IconButton,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import SectionDivider from "../components/divider";
import { useState } from "react";
import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import LoadingButton from "@mui/lab/LoadingButton";
import { MdClose } from "react-icons/md";
import { CertificationType } from "../types/types";
import { Certification } from "../components/certification";

export default function Certifications(props) {
    const [certifications, setCertifications] = useState<CertificationType[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const sm = useMediaQuery("@media (min-width:713px)");
    const md = useMediaQuery("@media (min-width:1061px)");

    useEffect(() => {
        fetch("api/certifications", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setCertifications(data.certifications);
                setLoading(false);
            });
    }, []);

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px) ",
            }}
            id={props.id}
        >
            <SectionDivider title={"Certifications"} sx={{ pt: "64px" }} />

            <Box
                sx={{
                    m: "1rem",
                    display: "flex",
                    // flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // alignItems: "center",
                    gap: "1rem",
                }}
            >
                {!certifications ? (
                    <></>
                ) : (
                    certifications
                        .slice(0, md ? 6 : sm ? 4 : 2)
                        .map((certProps, key) => (
                            <Certification key={key} {...certProps} />
                        ))
                )}
            </Box>
            {/* to be changed */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tilt scale={1.06} tiltMaxAngleX={15} tiltMaxAngleY={15}>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Loading..."
                        variant="contained"
                        sx={{
                            height: "2.5rem",
                            width: "8rem",
                            borderRadius: "1rem 0",
                        }}
                        onClick={() => setDialogOpen(!dialogOpen)}
                    >
                        See More
                    </LoadingButton>
                </Tilt>
            </Box>
            <CertificationsDialog
                certifications={certifications}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </Box>
    );
}

function CertificationsDialog({
    certifications,
    dialogOpen,
    setDialogOpen,
}: {
    certifications: CertificationType[];
    dialogOpen: boolean;
    setDialogOpen: any;
}) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <Dialog
            open={dialogOpen}
            fullScreen={!sm}
            onClose={() => setDialogOpen(false)}
            maxWidth="lg"
            scroll="paper"
            fullWidth
        >
            <DialogTitle
                sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: "0.35rem",
                    pr: "0.35rem",
                }}
            >
                My Certifications
                <IconButton
                    sx={{ mr: "0.5rem" }}
                    onClick={() => setDialogOpen(false)}
                >
                    <MdClose />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ px: "1rem", mt: "1rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        overflowY: "clip",
                        gap: "1rem",
                        pb: "3rem",
                    }}
                >
                    {!certifications ? (
                        <></>
                    ) : (
                        certifications.map((certProps, key) => (
                            <Certification key={key} {...certProps} />
                        ))
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
