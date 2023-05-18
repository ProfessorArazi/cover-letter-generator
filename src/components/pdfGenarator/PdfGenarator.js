import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { pdf, Font } from "@react-pdf/renderer";
import CenturyGothic from "../../assets/fonts/Century Gothic.ttf";
import CenturyGothicBold from "../../assets/fonts/GOTHICB0.TTF";
import { CoverLetterForm } from "../coverLetterForm/CoverLetterForm";

const PdfGenerator = () => {
  Font.register({
    family: "Century Gothic",
    fonts: [
      {
        src: CenturyGothic,
      },
      {
        src: CenturyGothicBold,
        fontWeight: "bold",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 46,
      paddingVertical: 18,
      fontFamily: "Century Gothic",
    },
    section: {
      padding: 8,
    },
    text: {
      fontSize: 12,
      lineHeight: 1.75,
      fontWeight: "normal",
    },
    name: {
      fontSize: 40,
      color: "#099",
      lineHeight: 1.5,
    },
    fName: {
      fontWeight: "normal",
    },
    lName: {
      fontWeight: "bold",
    },
    contactContainer: {
      flexDirection: "row",
    },
    contact: {
      fontSize: 11,
      lineHeight: 1.5,
      fontWeight: "normal",
    },
  });

  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const handleDownload = async (values) => {
    const {
      companyName,
      email,
      experienceYears,
      firstName,
      lastName,
      jobTitle,
      phoneNumber,
      portfolio,
      github,
      linkedin,
    } = values;
    const blob = await pdf(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.name}>
              <Text style={styles.fName}>{firstName.toUpperCase()}</Text>
              <Text style={styles.lName}>{` ${lastName.toUpperCase()}`}</Text>
            </Text>
            <View style={{ flexDirection: "row" }}>
              {portfolio && (
                <View style={styles.contactContainer}>
                  <Link href={portfolio} style={styles.contact}>
                    Portfolio
                  </Link>
                  <Text style={styles.contact}> |</Text>
                </View>
              )}
              {github && (
                <View style={styles.contactContainer}>
                  <Link href={github} style={styles.contact}>
                    Github
                  </Link>
                  <Text style={styles.contact}> |</Text>
                </View>
              )}
              {linkedin && (
                <View style={styles.contactContainer}>
                  <Link href={linkedin} style={styles.contact}>
                    Linkedin
                  </Link>
                  <Text style={styles.contact}> |</Text>
                </View>
              )}
              <Text style={styles.contact}>
                {phoneNumber} | {email}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>{formattedDate}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>{companyName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>RE: {jobTitle}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Dear Hiring Manager,</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Please consider my application for the {jobTitle}
              position.{"\n"} I believe that my skillset and experience match
              well with your needs.{"\n"} I have included my resume for your
              review and look forward to learning more about {companyName}.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Reliable {jobTitle} with {experienceYears}{" "}
              {experienceYears > 1 ? "years" : "year"} of experience in the
              field.{"\n"} In all my work experiences, I have been effective in
              meeting development targets and highly cooperative when working
              with team members.{"\n"} I complete clean, error-free designs and
              support all kinds of projects with my abilities in troubleshooting
              and resolving software problems, web development and layout
              design.
              {"\n"} Highly knowledgeable in documenting bugs and testing
              strategies to evaluate new features.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              Please take a look at my enclosed resume for more details about my
              work experience and qualifications.{"\n"} I'd really like to speak
              with you more about the position, and I look forward to hearing
              from you soon.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>
              {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
              {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
            </Text>
          </View>
        </Page>
      </Document>
    ).toBlob();

    saveAs(blob, "generated_pdf.pdf");
  };

  return <CoverLetterForm handleDownload={handleDownload} />;
};

export default PdfGenerator;
