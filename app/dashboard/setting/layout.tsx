import AuthenticatedRoute from "@/HOC/withAuthorization";
import Breadcrumb from "@/components/breadcrumb";
import Section from "@/components/section";
import CONSTANTS from "@/constants";

export default function Layout({ children }: any) {
  return (
    <AuthenticatedRoute
      allowedRoles={[
        CONSTANTS.PERMISSIONS.ADMIN,
        CONSTANTS.PERMISSIONS.WRITE,
        // CONSTANTS.PERMISSIONS.BASIC,
        // CONSTANTS.PERMISSIONS.READ,
      ]}
    >
      <Section delay={0.1}>
        <Breadcrumb  data={[
            {
              title: "Home",
              url: "/",
            },
            {
              title: "Setting",
              url: "/dashboard/setting",
            },
          ]}/>
      </Section>
      <div className="mt-4">{children}</div>
    </AuthenticatedRoute>
  );
}
