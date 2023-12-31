import Breadcrumb from "@/components/breadcrumb";
import Section from "@/components/section";

export default function Layout({ children }: any) {
  return (
    <>
      <Section delay={0.1}>
        <Breadcrumb
          data={[
            {
              title: "Home",
              url: "/",
            },
            {
              title: "Profile",
              url: "/dashboard/profile",
            },
          ]}
        />
      </Section>
      <div className="mt-4">{children}</div>
    </>
  );
}
