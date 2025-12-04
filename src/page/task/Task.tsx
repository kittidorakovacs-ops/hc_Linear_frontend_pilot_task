import ReactMarkdown from "react-markdown";
import {Box, Divider, Typography} from "@mui/material";
import {taskData} from "./data/task.data";
import {Card, Header, Page, Subtitle, Title} from "./style/task.style";

export default function Task() {
    return (
        <Page>
            <Header>
                <Typography variant="h3" fontWeight={900}>
                    {taskData.title}
                </Typography>
                <Subtitle sx={{color: "var(--text-color-light)"}}>
                    {taskData.subtitle}
                </Subtitle>
            </Header>

            {taskData.sections.map((section) => (
                <Card key={section.title}>
                    <Title variant="h5">{section.title}</Title>
                    <Divider sx={{my: 2, borderColor: "rgba(255,255,255,0.1)"}}/>

                    <ReactMarkdown
                        components={{
                            p: (props) => (
                                <Typography
                                    {...props}
                                    sx={{color: "var(--text-color-light)", mb: 1, fontSize: "1.4rem"}}
                                />
                            ),
                            li: (props) => (
                                <li
                                    {...props}
                                    style={{color: "var(--text-color-light)", marginBottom: 4, fontSize: "1.3rem"}}
                                />
                            ),
                            code: (props) => (
                                <code
                                    {...props}
                                    style={{
                                        background: "rgba(255,255,255,0.1)",
                                        padding: "3px 6px",
                                        borderRadius: "4px",
                                        fontSize: "1rem",
                                    }}
                                />
                            ),
                        }}
                    >
                        {section.markdown}
                    </ReactMarkdown>
                </Card>
            ))}

            <Box textAlign="center" mt={2}>
                <Typography
                    fontWeight={800}
                    sx={{
                        color: "var(--primary-color)",
                        textShadow: "0 0 12px rgba(27,226,154,0.45)",
                    }}
                >
                    Jó munkát!
                </Typography>
            </Box>
        </Page>
    );
}
