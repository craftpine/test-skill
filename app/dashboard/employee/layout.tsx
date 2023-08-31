import AuthenticatedRoute from "@/HOC/withAuthorization";
import CONSTANTS from "@/constants";

export default function Layout({ children }: any) {
  return (
    <AuthenticatedRoute
      allowedRoles={[
        CONSTANTS.PERMISSIONS.ADMIN,
        CONSTANTS.PERMISSIONS.WRITE,
        // CONSTANTS.PERMISSIONS.BASIC,
        CONSTANTS.PERMISSIONS.READ,
      ]}
    >
      {children}
    </AuthenticatedRoute>
  );
}
