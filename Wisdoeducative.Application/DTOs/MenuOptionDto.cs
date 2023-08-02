using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.DTOs
{
    public class MenuOptionDto : IMapFrom<MenuOption>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsParent { get; set; }
        public string Icon { get; set; }
        public string Path { get; set; }
        public EntityStatus Status { get; set; }
    }
}