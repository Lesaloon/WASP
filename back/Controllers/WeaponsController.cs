using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wasp.Backend.DTOs;
using Wasp.Backend.Services;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/weapons")]
    public class WeaponsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public WeaponsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ItemBaseDto>>> GetWeapons([FromQuery] ItemFilterDto filter)
        {
            filter.Type = Enums.ItemType.Weapon;
            var result = await _itemService.GetItemsAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<WeaponDto>> GetWeapon(Guid id)
        {
            try
            {
                var item = await _itemService.GetItemByIdAsync(id);
                if (!(item is WeaponDto))
                    return NotFound(new { message = "Weapon not found" });

                return Ok(item as WeaponDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Weapon not found" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<WeaponDto>> CreateWeapon([FromBody] WeaponDto weaponDto)
        {
            try
            {
                var createdWeapon = await _itemService.CreateWeaponAsync(weaponDto);
                return CreatedAtAction(nameof(GetWeapon), new { id = createdWeapon.Id }, createdWeapon);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateWeapon(Guid id, [FromBody] WeaponDto weaponDto)
        {
            try
            {
                await _itemService.UpdateWeaponAsync(id, weaponDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Weapon not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteWeapon(Guid id)
        {
            try
            {
                var result = await _itemService.DeleteItemAsync(id);
                if (!result)
                    return NotFound(new { message = "Weapon not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{weaponId:guid}/parts/{partId:guid}")]
        public async Task<IActionResult> LinkPartToWeapon(Guid weaponId, Guid partId, [FromBody] LinkPartDto linkDto)
        {
            try
            {
                var result = await _itemService.LinkPartToWeaponAsync(weaponId, partId, linkDto.IsInstalled, linkDto.Notes);
                if (!result)
                    return NotFound(new { message = "Weapon or Part not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{weaponId:guid}/parts/{partId:guid}")]
        public async Task<IActionResult> UnlinkPartFromWeapon(Guid weaponId, Guid partId)
        {
            try
            {
                var result = await _itemService.UnlinkPartFromWeaponAsync(weaponId, partId);
                if (!result)
                    return NotFound(new { message = "Weapon or Part not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{weaponId:guid}/accessories/{accessoryId:guid}")]
        public async Task<IActionResult> LinkAccessoryToWeapon(Guid weaponId, Guid accessoryId, [FromBody] LinkAccessoryDto linkDto)
        {
            try
            {
                var result = await _itemService.LinkAccessoryToWeaponAsync(weaponId, accessoryId, linkDto.IsMounted, linkDto.Notes);
                if (!result)
                    return NotFound(new { message = "Weapon or Accessory not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{weaponId:guid}/accessories/{accessoryId:guid}")]
        public async Task<IActionResult> UnlinkAccessoryFromWeapon(Guid weaponId, Guid accessoryId)
        {
            try
            {
                var result = await _itemService.UnlinkAccessoryFromWeaponAsync(weaponId, accessoryId);
                if (!result)
                    return NotFound(new { message = "Weapon or Accessory not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
