declare const withAuth: <TypeInfo extends import("@keystone-6/core/types").BaseKeystoneTypeInfo>(config: import("@keystone-6/core/types").KeystoneConfig<TypeInfo>) => import("@keystone-6/core/types").KeystoneConfig<TypeInfo>;
declare const session: import("@keystone-6/core/types").SessionStrategy<unknown, any>;
export { withAuth, session };
