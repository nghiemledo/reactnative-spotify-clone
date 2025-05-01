using AutoMapper;
using SPO.Application.DataTransferObjects.Request.UserRoles.Role;
using SPO.Application.DataTransferObjects.Request.UserRoles.User;
using SPO.Application.DataTransferObjects.Request.UserRoles.UserRole;
using SPO.Domain.Entities.UserRoles;

namespace SPO.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateRoleRequest, Role>();
            CreateMap<CreateUserRequest, User>();
            CreateMap<CreateUserRoleRequest, UserRole>();
        }
    }
}
