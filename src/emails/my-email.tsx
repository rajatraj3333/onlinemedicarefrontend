
import { Button, Html, Container} from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
        <Container style={{border:'1px solid gray'}}>
        <Button href="https://example.com" style={{ color: "#61dafb" }}>
        Click   
      </Button>
        </Container>
    </Html>
  );
}
