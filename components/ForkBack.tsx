import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAtomValue } from "jotai";
import { forkLinksMapA } from "./Fork";
import { useEffect, useState } from "react";

export default (props: { label: string }) => {
    const forkLink = useAtomValue(forkLinksMapA)[props.label];
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (forkLink === undefined) {
            setTimeout(() => {
                setCount(count + 1);
            }, 20);
        }
    });

    return (
        <Card sx={{ minWidth: 275, margin: 1 }}>
            {forkLink ? (
                <CardActionArea
                    href={"#" + forkLink.id}
                    id={props.label + forkLink.id}
                >
                    <CardContent>
                        <Typography
                            sx={{
                                fontSize: 15,
                                display: "flex",
                                alignItems: "center",
                            }}
                            color="text.secondary"
                            gutterBottom
                        >
                            <VerticalAlignTopIcon
                                fontSize="small"
                                sx={{ marginRight: 0.2, marginTop: -0.1 }}
                            />
                            点击返回分支
                        </Typography>
                        <Typography variant="h5">
                            {props.label}
                            <KeyboardArrowRightIcon
                                sx={{ marginBottom: -0.7 }}
                            />
                            {forkLink.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginY: 3,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Card>
    );
};
